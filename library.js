var Library;
(function (Library) {
    var utils;
    (function (utils) {
        class Generate {
            static generateCombinaisons(a) {
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
                };
                var all = [];
                for (var i = 0; i < a.length; i++) {
                    fn(i, a, [], all);
                }
                all.push(a);
                return all;
            }
            static countCombinaisons(k, n) {
                if (k == n)
                    return 1;
                if (k > (n / 2))
                    k = n - k;
                let res = n - k + 1;
                for (let i = 2; i <= k; i++) {
                    res = res * (n - k + i) / i;
                }
                return res;
            }
            static getCombinaisons(ensemble, k, criteresCtr) {
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
                        if (cb)
                            limitedCombinaisonsbyCritereCtr.push(cb);
                    });
                }
                else
                    limitedCombinaisonsbyCritereCtr = limitedCombinaisonsbyK;
                return limitedCombinaisonsbyCritereCtr;
            }
            static getObjectCombinaisons(ensemble, k, criteresCtr) {
                let that = this;
                let ids = [];
                ensemble = ensemble.map((v, i) => {
                    v.id = i;
                    ids.push(v.id);
                    return v;
                });
                let combinaisonsIds = Generate.getCombinaisons(ids, k);
                let combinaisonsObject = combinaisonsIds.map(cb => {
                    cb.forEach((v, i) => {
                        cb[i] = ensemble[v];
                    });
                    return cb;
                });
                let res = [];
                combinaisonsObject.forEach(cb => {
                    cb = criteresCtr(cb);
                    if (cb)
                        res.push(cb);
                });
                return res;
            }
        }
        utils.Generate = Generate;
        class UX {
            static toString(combinaisons, props) {
                combinaisons = combinaisons || [];
                props = props || ["nom"];
                let cbRes = [];
                combinaisons.forEach((cb, index) => {
                    let eRes = [];
                    cb.forEach(e => {
                        let pRes = [];
                        for (let i = 1; i < props.length; i++) {
                            pRes.push(props[i] + " = " + e[props[i]]);
                        }
                        eRes.push(e[props[0]] + (pRes.length ? "(" + pRes.join(", ") + ")" : ""));
                    });
                    cbRes.push("[ " + eRes.join(" , ") + " ]");
                });
                return "{\n\t" + cbRes.join("\n\t") + "\n}";
            }
        }
        utils.UX = UX;
        class AppData {
            constructor(config) {
                let that = this;
                that.config = config;
            }
        }
        utils.AppData = AppData;
    })(utils = Library.utils || (Library.utils = {}));
    var Test;
    (function (Test) {
        function testInit() {
            let data = {
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
                ],
                cordes: ["A", "B", "C", "D", "E"]
            };
            let n = 5;
            let k = 4;
            console.log(Library.utils.Generate.countCombinaisons(k, n));
            let combinaisons = Library.utils.Generate.getObjectCombinaisons(data.ensemble, k, c => {
                let ok = true;
                let cv = 0;
                c.every(e => {
                    if (e.nom == "C" || e.nom == "B") {
                        cv++;
                    }
                    return true;
                });
                if (ok)
                    return c;
            });
            console.log(Library.utils.UX.toString(combinaisons, ["nom"]));
        }
        testInit();
    })(Test || (Test = {}));
})(Library || (Library = {}));
