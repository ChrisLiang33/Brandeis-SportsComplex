const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const userSchema = mongoose.Schema(
  {
    //basic attributes
    name: {
      first: {
        type: String,
        trim: true,
      },
      last: {
        type: String,
        trim: true,
      },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    memberships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Membership' }],
  },
  {
    timestamps: true,
  },
)

userSchema.virtual('fullName').get(function() {
  return `${this.name.first} ${this.name.last}`
})

//to add or remove or check user.membership
userSchema.methods.addMembership = function(membership) {
  if (this.memberships.indexOf(membership._id) === -1) {
    this.memberships.push(membership)
  }
  return this.save()
}

userSchema.methods.removeMembership = function(membership) {

  if (this.memberships.indexOf(membership._id) === -1) {
    this.memberships.remove(membership)
  }
  return this.save()
}

userSchema.methods.hasMembership = function(membership) {
  return this.memberships.some(function(membershipId) {
    return membershipId.equals(membership._id)
  })
}

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = mongoose.model('User', userSchema)
