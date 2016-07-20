var notes=[],
	$headerForm=$('.header-form'),
	$notesContainer=$('.note-container'),
	$notesTitle=$headerForm.find("input[name='note_title']"),
	$notesContent=$headerForm.find("textarea[name='note_content']");

function appendSingleNote(data) {
	var content=data.content, title=data.title;

	var html='<div class="note" id="'+data.id+'">'+
				"<button class='note-close' onclick=deleteNote('"+data.id+"')>x</button>"+
				'<h3 class="note-title">'+title+'</h3>'+
				'<p class="note-content">'+content+
				'</p>'+
			'</div>';
	// console.log(html);
	$notesContainer.append(html);
}

function genID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
     return v.toString(16);
  });
}

function storeNote(data) {
	notes.push(data);
	window.localStorage.setItem('notes', JSON.stringify(notes));
	appendSingleNote(data);
}

function deleteNote(id) {
	console.log("about to delete note");
	console.log(id);
	for(var i=0; i<notes.length; i++) {
		if(notes[i].id === id) {
			notes.splice(i,1);
			break;
		}
	}
	window.localStorage.setItem('notes', JSON.stringify(notes));
	$('#'+id).remove();	
}

$headerForm.on('submit', function(e) {
	e.preventDefault();
	var data={
		id: genID(),
		title: $notesTitle.val(),
		content: $notesContent.val()
	};
	storeNote(data);
});

function init() {
	if (window.localStorage.getItem('notes')) {
		notes=JSON.parse(window.localStorage.getItem('notes'));
	}
	else {
		notes=[];
	}
	console.log(notes);
	for (var i=0;i<notes.length;i++) {
		appendSingleNote(notes[i]); 
	}
}

init();