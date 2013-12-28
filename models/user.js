var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var hashPrefix="kadabra";

var userSchema = mongoose.Schema({
	local:{
		email:String,
		password:String,
		apiKey:String
	}
});

// methods ======================
// checking if password is valid using bcrypt
userSchema.methods.validateApiKey = function(key) {
    return bcrypt.compareSync(key, this.local.apiKey);
};

// this method hashes the password and sets the users password
userSchema.methods.generateKey = function(password, done) {
    var apiKey = hashPrefix + password;
    var user = this;

    bcrypt.hash(apiKey, null, null, function(errKey, hashKey) {
        if (errKey) return next(errKey);
        bcrypt.hash(password, null, null, function(errPassword, hashPassword){
    		if(errPassword)return next(errPassword);

        	user.local.password = hashPassword;
        	user.local.apiKey=hashKey;		
        	done();
        });
    });

};

module.exports = function(){
	return mongoose.model('User',userSchema);	
}