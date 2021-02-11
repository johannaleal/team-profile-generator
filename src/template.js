
const renderHTML = (teamMembers) => {
  // Build a string with user responses.
  const content = formatReadMe(userResponses);

  // Write the generated content to a file. If there is an error writing to the file, console.log the error message received.
  // Else, console.log an success message.
  // NOTE: FOR TESTING PURPOSES I HAVE NAMED THE OUTPUT FILE README_TEST.MD SO AS NOT TO OVERWRITE MY ACTUAL README.MD FILE.
  fs.writeFile("readme_test.md", content, (err) => err ? console.error(err) : console.log("File was successly generated!"));
}

const formatReadMe = (userResponses) => {
    let link = "";

    // Find the selected badge link.
    switch (userResponses.license)  {
        case "Apache License 2.0":
            link = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            break;
        case "GNU General Public License v3.0":
            link = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            break;
        case "MIT License":
            link = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            break;
        case "BSD-2-Clause Simplified License":
            link = "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
            break;
        case "Mozilla Public License 2.0":
            link = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
            break;
     };

    // Return the content string which contains the content of the ReadMe file.
    let content = `# ${userResponses.title}

${link}

## Description

${userResponses.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
${userResponses.installation};

## Usage
${userResponses.usage}

## License
This application is covered under license: ${userResponses.license}

## Contributing
${userResponses.contribution}

## Tests
${userResponses.testInstructions}

## Questions
### Contact Information:

GitHub Profile: [@${userResponses.gitHubUserName}](http://github.com/${userResponses.gitHubUserName})

Email: <${userResponses.email}>
    `;

    return content;
}