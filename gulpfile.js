const {src, watch, dest} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function Css(){
    return src("src/Sass/app.scss").
    pipe( sass() ).
    pipe( dest("src/") );
}

function Watch(){
    watch("src/Sass/**/*.scss", Css);
}

exports.watch = Watch 