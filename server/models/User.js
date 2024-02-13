const {Schema, model} = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    }
  }
)

//Slightly different way of using bcrypt
userSchema.pre("save", async function(next) {
  if (this.isNew || this.isModified("password")){
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds)
  }
  next();
})

userSchema.method.isCorrectPassword = async function(password){
  return bcrypt.compare(password, this.password)
}

const User = model("User", userSchema)

module.exports = User