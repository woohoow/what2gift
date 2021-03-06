// use lodash
_ = lodash;

//useraccounts customization configurations
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
    {
        _id: "username",
        type: "text",
        displayName: "username",
        required: true,
        minLength: 5,
    },
    {
        _id: 'email',
        type: 'email',
        required: true,
        displayName: "email",
        re: /.+@(.+){2,}\.(.+){2,}/,
        errStr: 'Invalid email',
    },
    {
        _id: 'username_and_email',
        type: 'text',
        required: true,
        displayName: "User Name or Email",
    },
    pwd
]);


AccountsTemplates.configure({
    showForgotPasswordLink: true,
    enablePasswordChange: true,
    negativeValidation: false,
    negativeFeedback: false,
    positiveValidation: false,
    positiveFeedback: false,
    homeRoutePath: 'events_list',
    onLogoutHook: function(){
        console.log('accounts template logout hook triggered');
        Router.go('home');
    },
});
