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

AccountsTemplates.addField({
  _id: 'terms',
  type: 'checkbox',
  template: "termsCheckbox",
  errStr: "You must agree to the Terms and Conditions",
  func: function(value) {
    return !value;
  },
  negativeValidation: false
});

AccountsTemplates.configure({
    // defaultTemplate: 'myCustomFullPageAtForm',
    defaultLayout: 'layout',
    defaultLayoutRegions: {
        menubar: 'menubar',
    },
    defaultContentRegion: 'content',
    showForgotPasswordLink: true,
    enablePasswordChange: true,
    negativeValidation: false,
    negativeFeedback: false,
    positiveValidation: false,
    positiveFeedback: false,
    homeRoutePath: 'home', // use '/' if not working
    onLogoutHook: function(){
        console.log('accounts template logout hook triggered');
        FlowRouter.go('home');
    },
    onSubmitHook: function(error, state){
        console.log('account login on submit');
        if(!error){
            console.log('success login');
            // $('.ui.dropdown').dropdown();
        }
    }

    // //terms
    // termsUrl: 'terms',
    // privacyUrl: 'privacy',
});
