const { User, Thought } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find()
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },

  // get single user by id
  getUserById(req, res) {
    User.findById(req.params.userId)
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
      })
      .catch(err => res.status(500).json(err));
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },

  // update a user
  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { runValidators: true, new: true })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
      })
      .catch(err => res.status(500).json(err));
  },

  // delete user and associated thoughts
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        // Delete the user's thoughts
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted!' });
      })
      .catch(err => res.status(500).json(err));
  },

  // add friend to friend list
  addFriend(req, res) {
    User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
      })
      .catch(err => res.status(500).json(err));
  },

  // remove friend from friend list
  removeFriend(req, res) {
    User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
      })
      .catch(err => res.status(500).json(err));
  },
};

module.exports = userController;
