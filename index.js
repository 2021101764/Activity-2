import inquirer from 'inquirer';
import sillyname from 'sillyname';
import { randomSuperhero } from 'superheroes';
import qr from 'qr-image';
import fs from 'fs';

inquirer.prompt([{
    type: 'input',
    name: 'Euan',
    message: 'What is your name?'
}]).then((answers) => {
    const Euan = answers.Euan;
    const Sup1 = sillyname();

    // Use randomSuperhero to get a random superhero name
    const Sup2 = randomSuperhero();

    console.log(`Hello ${Euan}`);
    console.log(`Your villain name will be ${Sup1}`);
    console.log(`Your superhero name will be ${Sup2}`);
    console.log("QR codes are generated");
    console.log("Text file updated");

    // Generate QR codes
    generateQRCode(Euan, 'Name.png');
    generateQRCode(Sup1, 'Sup1.png');
    generateQRCode(Sup2, 'Sup2.png');

    // Save names to a text file
    const textContent = `Name: ${Euan}\nVillain Name: ${Sup1}\nSuperhero Name: ${Sup2}\n`;
    fs.writeFile('myhero.txt', textContent, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Names saved to myhero.txt ');
        }
    });
}).catch((error) => {
    if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment.");
    } else {
        console.error("Something went wrong:", error);
    }
});

// Function to generate QR code
function generateQRCode(text, filename) {
    const qr_svg = qr.image(text, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream(filename));
}