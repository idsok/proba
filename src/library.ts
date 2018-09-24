declare var $: any;
declare var joint: any;
declare var _: any;

namespace Library {
    export module utils {
        // class et interface du lib
        export interface Ensemble {
            id?: number;
            nom: string;
            age?: number;
            genre?: string;
            couleur?: string;
        }

        export interface Config {
            couleurs: any; // { name: { title: string } }
            genres: any; // { name: { title: string } }
            groups: any; // { name: { title: string } };
            cordes: string[];
            ensemble: Ensemble[];
            criteres: any;
        }

        export class Generate {
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
            public static getCombinaisons(ensemble: any[], k?: number, criteresCtr?: Function) {
                let allCombinaisons = Generate.generateCombinaisons(ensemble);
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
            public static  getObjectCombinaisons(ensemble: Ensemble[], k?: number, criteresCtr?: Function) {
                let that = this;
                // Identifier les éléments de l'ensemble
                let ids = [];
                ensemble = ensemble.map((v, i) => {
                    v.id = i;
                    ids.push(v.id);
                    return v;
                });
                // Générer les combinaisons
                let combinaisonsIds = Generate.getCombinaisons(ids, k);
                // Compléter les informations de combinaisons
                let combinaisonsObject = combinaisonsIds.map(cb => {
                    cb.forEach((v, i) => {
                        cb[i] = ensemble[v];
                    });
                    return cb;
                });
                // Appliquer les critères
                let res = [];
                combinaisonsObject.forEach(cb => {
                    cb = criteresCtr(cb);
                    if (cb) res.push(cb);
                });
                return res;
            }
        }

        export class UX {
            public static toString(combinaisons: any[], props?: string[]): string {
                combinaisons = combinaisons || [];
                props = props || ["nom"];
                let cbRes = [];
                combinaisons.forEach((cb, index) => {
                    let eRes = [];
                    cb.forEach(e => {
                        let pRes = [];
                        for (let i = 1; i < props.length; i++) {
                            pRes.push(props[i] +" = "+ e[props[i]]);
                        }
                        eRes.push(e[props[0]] + ( pRes.length ? "("+ pRes.join(", ") +")" : ""));
                    });
                    cbRes.push("[ "+ eRes.join(" , ") +" ]");
                });
                return "{\n\t"+ cbRes.join("\n\t") +"\n}";
            }
        }

        export class AppData {
            private config: Library.utils.Config;
            constructor(config?: Config) {
                let that = this;
                that.config = config;
            }
        }
    }


    namespace Test {

        function testInit() {
            let data: Library.utils.Config = {
                criteres: {
                    age: [">= 10"],
                    couleur: ["black"]
                },
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
                    m: {
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
                    impaire: {
                        name: "impaire",
                        title: "Impaire"
                    }
                },
                ensemble: [
                    {
                        nom: "A",
                        age: 8,
                        genre: "m",
                        couleur: "black",
                        corde: 1
                    },
                    {
                        nom: "B",
                        age: 10,
                        genre: "f",
                        couleur: "black",
                        corde: 3
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
                ],
                cordes: [3, 1, 4, 5, 2]
            }
            let n = 5;
            let k = 4;
            console.log(Library.utils.Generate.countCombinaisons(k, n));
            //console.log(Library.utils.Combinaison.combinaisons([1, 2, 3, 4, 5]));
            let combinaisons = Library.utils.Generate.getObjectCombinaisons(data.ensemble, k, c => {
                let ok: boolean = true;
                let cv = 0;
                c.every(e => { 

                    //if (e.age < 10) {
                    //    ok = false;
                    //    return false;
                    //}
                    if (e.nom == "C" || e.nom == "B") {
                        cv++;
                    }
                    return true;
                });
                if (ok) return c;
            });
            console.log(Library.utils.UX.toString(combinaisons, ["nom"]));
        }

        testInit();
    }
}