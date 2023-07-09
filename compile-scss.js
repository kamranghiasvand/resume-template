const sass = require('node-sass');
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

// Set input and output folder paths
const inputFolderPath = 'scss';
const outputFolderPath = 'public/css';

// Function to compile SCSS to CSS
const compileSass = () => {
    fs.readdir(inputFolderPath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        files.forEach((file) => {
            if (path.extname(file) === '.scss') {
                const inputFilePath = path.join(inputFolderPath, file);
                const outputFilePath = path.join(
                    outputFolderPath,
                    path.basename(file, '.scss') + '.css'
                );

                sass.render(
                    {
                        file: inputFilePath,
                        outFile: outputFilePath,
                    },
                    function (error, result) {
                        if (error) {
                            console.error(error);
                        } else {
                            fs.writeFile(outputFilePath, result.css, function (err) {
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log(`SCSS file ${file} compiled successfully!`);
                                }
                            });
                        }
                    }
                );
            }
        });
    });
};

// Compile SCSS initially
compileSass();

// Watch SCSS files for changes
chokidar.watch(path.join(inputFolderPath, '**/*.scss')).on('change', compileSass);
