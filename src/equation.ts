import GA from './index';
const l1 = (x1, x2) => {
    return 21.5 + x1 * Math.sin(4 * Math.PI * x1) - x2 * Math.sin(20 * Math.PI * x2);
}

var g = new GA([[-3, 12.1], [4.1, 5.8]], l1, 5, 100, 1000, 0.2, 0.05);

console.log(g.eval());
