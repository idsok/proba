var Library;
(function (Library) {
    var utils;
    (function (utils) {
        class Combinaison {
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
            static getCombinaisons(ensemble, k, critereCtr) {
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
                if (critereCtr) {
                    limitedCombinaisonsbyCritereCtr = [];
                    limitedCombinaisonsbyK.forEach(cb => {
                        cb = critereCtr(cb);
                        if (cb)
                            limitedCombinaisonsbyCritereCtr.push(cb);
                    });
                }
                else
                    limitedCombinaisonsbyCritereCtr = limitedCombinaisonsbyK;
                return limitedCombinaisonsbyCritereCtr;
            }
        }
        utils.Combinaison = Combinaison;
    })(utils = Library.utils || (Library.utils = {}));
    var Test;
    (function (Test) {
        function testInit() {
            console.log(Library.utils.Combinaison.countCombinaisons(4, 5));
            console.log(Library.utils.Combinaison.getCombinaisons([1, 2, 3, 4, 5], 4, c => {
                if (c[0] == 1)
                    return c;
            }));
        }
        testInit();
    })(Test || (Test = {}));
})(Library || (Library = {}));
