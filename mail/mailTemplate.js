const keys = require("../config/keys");

module.exports = (survey, email) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h2>This is the survey from https://survey-easy.herokuapp.com/<h2/>
          <p>The author ${
            email || "no-reply@survey-easy53.com"
          } like your input!</p>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${
    survey.id
  }/yes">Yes</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
