var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var less = require('gulp-less');
var connect = require('gulp-connect');



// 注册编译less任务
gulp.task('less', function(){
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css/'))
        .pipe(connect.reload())
});

// 注册合并压缩css任务
gulp.task('css', function(){
    return gulp.src('src/css/*.css')
        // .pipe(concat('mui-selector.css'))
        // .pipe(minifycss())
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload())
});

// 注册合并js任务
gulp.task('js', function(){
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js/'))
        .pipe(connect.reload())
});

// 注册html任务
gulp.task('html', function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload())
});


// 注册服务器自动更新任务（全自动）
gulp.task('connect',function () {
    // 配置服务器
    connect.server({
        root: './dist/',  // 配置源文件根目录
        port: '8888',   // 配置端口
        livereload: true  // 是否自动更新
    });
    gulp.watch('src/js/*.js',gulp.series(['js']));
    gulp.watch('src/less/*.less',gulp.series(['less']));
    gulp.watch('src/css/*.css',gulp.series(['css']));
    gulp.watch('src/*.html',gulp.series(['html']));

});


// 默认任务，执行gulp时自动执行
gulp.task('default',gulp.series(['js','less','css','html','connect']));
 
 