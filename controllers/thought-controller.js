const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then(thoughts => res.json(thoughts))
      .catch(err => res.status(500).json(err));
  },

  // get single thought by id
  getThoughtById(req, res) {
    Thought.findById(req.params.thoughtId)
      .then(thought => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
      })
      .catch(err => res.status(500).json(err));
  },

  // create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(thought => {
        return User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
      })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }
        res.json({ message: 'Thought successfully created!' });
      })
      .catch(err => res.status(500).json(err));
  },

  // update thought
  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { runValidators: true, new: true })
      .then(thought => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
      })
      .catch(err => res.status(500).json(err));
  },

  // delete thought
  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then(thought => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findByIdAndUpdate({ _id: thought.username }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
      })
      .then(user => {
        res.json({ message: 'Thought successfully deleted!' });
      })
      .catch(err => res.status(500).json(err));
  },

  // add a reaction to a thought
  addReaction(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { runValidators: true, new: true })
      .then(thought => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
      })
      .catch(err => res.status(500).json(err));
  },

  // remove reaction from a thought
  removeReaction(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true })
      .then(thought => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
      })
      .catch(err => res.status(500).json(err));
  },
};

module.exports = thoughtController;
