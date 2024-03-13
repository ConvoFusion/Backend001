const brevo = require("sib-api-v3-sdk");
let defaultClient = brevo.ApiClient.instance;
// if (brevo.ApiClient) {
//  var defaultClient = brevo.ApiClient.instance;
//   // Continue with the rest of your code
// } else {
//   console.error("ApiClient is not defined in the brevo module.");
// }

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";

let apiInstance = new brevo.TransactionalEmailsApi();
let sendSmtpEmail = new brevo.SendSmtpEmail();

// brevp.apiKey(process.env.SG_KEY);

const sendSGMail = async ({
  from,
  to,
  subject,
  html,
  // attachments,
  // text,
}) => {
  try {
    sendSmtpEmail.sender = { name: "TLAF", email: from };

    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    sendSmtpEmail.replyTo = {
      email: "tlafconvofusion@gmail.com",
      name: "TLAF",
    };
    // sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    // sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
    // sendSmtpEmail.attachment = attachments;

    return apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log(
          "API called successfully. Returned data: " + JSON.stringify(data)
        );
      },
      function (error) {
        console.error(error);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmail = async (args) => {
  if (!process.env.NODE_ENV === "development") {
    return Promise.resolve();
  } else {
    return sendSGMail(args);
  }
};
