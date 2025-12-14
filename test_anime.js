const anime = require('animejs');
console.log('Type of anime:', typeof anime);
console.log('Is function?', typeof anime === 'function');
console.log('Has timeline?', typeof anime.timeline === 'function');
console.log('Export keys:', Object.keys(anime));
console.log('anime.default:', anime.default);
if (anime.default) {
    console.log('Type of anime.default:', typeof anime.default);
    console.log('Has timeline on default?', typeof anime.default.timeline === 'function');
}
