const renderHTML = (teamMembers) => {
  // Build a string with user responses.
    let html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Team Profile</title>

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">

            <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
            integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
            crossorigin="anonymous"/>

            <style>
                * {
                    box-sizing: border-box;
                    padding: 0;
                    margin: 0;
                }

                .jumbotron {
                    padding: 32px 16px;
                    background-color:steelblue;
                }

                h1 {
                    font-family:Arial, Helvetica, sans-serif;
                    font-weight: bolder;
                    color: white;
                }
            </style>
        </head>

        <body>
        <div class="jumbotron">
            <h1 class="display-4" style="text-align: center;">Johanna's Team</h1>
        </div>

        <div class="row" style="align-items: center;">
    `;

    for (let i = 1; i < teamMembers.length; i++) {
        let employeeField = "";

        html = html + 
        `<div class="col-md-3">
            <div class="card" style="width: 18rem;">
                <div class="card-body" style="background-color: lightseagreen;">
                  <h5 class="card-title">${teamMembers[i].getName()}</h5>
                  <p class="card-text">`;

                  switch (teamMembers[i].getRole()) {
                    case "Manager": 
                        html = html + `<i class="fas fa-mug-hot"></i>Manager</p>/div>`;
                        employeeField = "Office number:" + teamMembers[i].getOfficeNumber();
                        break;
                    case "Engineer":
                        html = html + `<p class="card-text"><i class="fas fa-glasses"></i>Engineer</p>`;
                        employeeField = "GitHub: <a href='https://github.com/'" + teamMembers[i].getGitHub() +  "target='_blank'>" + teamMembers[i].getGitHub() + "</a>";
                        break;
                    case "Intern":
                        html = html + `<p class="card-text"><i class="fas fa-user-graduate"></i>Intern</p>`;
                        employeeField = "School: " + teamEmployees[i].getSchool();
                        break;
                  };

                  html = html + 
                    `<div class="card-body" style="background-color:lightgray">
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${teamMembers[i].getId()}.id</li>
                    <li class="list-group-item">Email: <a href="${teamMembers[i].getEmail()}" class="card-link">${teamMembers[i].getEmail()}</a></li>
                    <li class="list-group-item">${employeeField}</li>
                    </ul>
                </div>
            </div>
        </div>`;
    };

    html = html + "</div></body></html>";
console.log(html);
};

module.exports = renderHTML;