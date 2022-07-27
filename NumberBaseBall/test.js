const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const array = [];
for (let i = 0; i < 4; i += 1) {
    const choosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    console.log('', candidates);
}

console.log('죠인', ["사과","오이","배추","무우"].join(','), typeof ["사과","오이","배추","무우"].join(','));