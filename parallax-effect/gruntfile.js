module.exports = function(grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      /*sass*/
      // sass: { // Tarea
         // dist: { // Target
         //    options: { // Target options
         //       style: 'expanded'
         //    },
         //    files: { // Dictionary of files
         //       // directorio de salida : entrada del directorio y archivo a compilar
         //       'dist/css/estilos.css': 'src/css/estilos.sass'// 'destination': 'source'
         //    }
         // }

      // },

      sass: {
            dist: {
                options: {
                    style: 'expanded',   //expanded(CSS sin comprimir), compressed(CSS comprimido)
                    noCache: true
                },
                files: [{
                    expand: true,
                    cwd:    "src/css",
                    src:    ["*.sass"],
                    dest:  "dist/css",
                    ext:    ".css"
                }]
            }
		},
      /*copy*/
      copy: {
         main: {
            expand: true,
            cwd: 'src/', //  carpeta origen
            src: ["**", "!css/*.sass"], //copia todo, excepto los archivos con extension .sass
            dest: 'dist/' //carpeta destino
         }
      },
      /*visualizar con watch*/
      watch: {
         sass: {
            files: ['src/css/*.sass'],
            tasks: ['sass']
         },
         copy: {
            files: ['src/**'],
            tasks: ['copy:main']
         }
      },
      /*aki iba el compilar*/
      /*browserSync*/
      browserSync: {
         dev: {
            bsFiles: {
               src: [
                  'dist/css/*.css',
                  'dist/*.html'
               ]
            },
            options: {
               watchTask: true,
               server: './dist',
               // Open the site in Chrome
               browser: "opera"

            }
         }
      }



   });

   // load NPM tasks
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-sass');
   grunt.loadNpmTasks('grunt-browser-sync');

   // define default task
   grunt.registerTask('default', ['browserSync', 'sass', 'copy', 'watch']);
};
