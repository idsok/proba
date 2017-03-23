declare var $: any;
declare var joint: any;
declare var _: any;

namespace Library {
    export module utils {
        // class et interface du lib
        export class Combinaison {
            // javascript
            public static generateCombinaisons(a) { // a = new Array(1,2)
                var fn = function (n, src, got, all) {
                    if (n == 0) {
                        if (got.length > 0) {
                            all[all.length] = got;
                        }
                        return;
                    }
                    for (var j = 0; j < src.length; j++) {
                        fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
                    }
                    return;
                }
                var all = [];
                for (var i = 0; i < a.length; i++) {
                    fn(i, a, [], all);
                }
                all.push(a);
                return all;
            }
            public static countCombinaisons(k, n): number {
                if (k == n) return 1;
                if (k > (n / 2)) k = n - k;
                let res = n - k + 1;
                for (let i = 2; i <= k; i++) {
                    res = res * (n - k + i) / i;
                }
                return res;
            }
            public static getCombinaisons(ensemble: any [], k?: number, criteresCtr?: Function) {
                let allCombinaisons = Combinaison.generateCombinaisons(ensemble);
                let limitedCombinaisonsbyK;
                if (k) {
                    limitedCombinaisonsbyK = [];
                    allCombinaisons.forEach(cb => {
                        if (cb.length == k) {
                            limitedCombinaisonsbyK.push(cb);
                        }
                    });
                }
                else
                    limitedCombinaisonsbyK = allCombinaisons;
                let limitedCombinaisonsbyCritereCtr;
                if (criteresCtr) {
                    limitedCombinaisonsbyCritereCtr = [];
                    limitedCombinaisonsbyK.forEach(cb => {
                        cb = criteresCtr(cb);
                        if (cb) limitedCombinaisonsbyCritereCtr.push(cb);
                    });
                }
                else
                    limitedCombinaisonsbyCritereCtr = limitedCombinaisonsbyK;
                return limitedCombinaisonsbyCritereCtr;
            }
    }

}


namespace Test {

    function testInit() {
        let data = {
            couleurs: {
                black: {
                    title: "Black"
                },
                blanc: {
                    title: "Blanc"
                },
                melange: {
                    title: "Melange"
                }
            },
            genres: {
                m : {
                    title: "Male",
                },
                f: {
                    title: "Femelle"
                },
                h: {
                    title: "Hongre"
                }
            },
            groups: {
                default: {
                    title: "Défault"
                },
                paire: {
                    title: "Paire"
                },
                impaire:{
                    name: "impaire",
                    title: "Impaire"
                }
            },
            ensemble: [
                {
                    nom: "A",
                    age: 8,
                    genre: "m",
                    couleur: "black"
                },
                {
                    nom: "B",
                    age: 10,
                    genre: "f",
                    couleur: "black"
                },
                {
                    nom: "C",
                    age: 15,
                    genre: "h",
                    couleur: "melange"
                },
                {
                    nom: "D",
                    age: 20,
                    genre: "m",
                    couleur: "blanc"
                },
                {
                    nom: "E",
                    age: 21,
                    genre: "m",
                    couleur: "blanc"
                }
            ]
        }
        console.log(Library.utils.Combinaison.countCombinaisons(4, 5));
        //console.log(Library.utils.Combinaison.combinaisons([1, 2, 3, 4, 5]));
        console.log(Library.utils.Combinaison.getCombinaisons([1, 2, 3, 4, 5], 4, c => {
            if (c[0] == 1) 
                return c;
        }));
    }

    testInit();
}
}