'use strict';

module.exports = function(app) {
	var sticykyNotes = require('../controllers/stickyNotesController');

	// sticykyNotes Routes
	app.route('/api/notes')
		.get(sticykyNotes.list_all_notes)
		.post(sticykyNotes.create_a_note);

	app.route('/api/notes/:noteId')
		.get(sticykyNotes.read_a_note)
		.put(sticykyNotes.update_a_note)
		.delete(sticykyNotes.delete_a_note);
};
