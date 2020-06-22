import 'jquery-mask-plugin';

$('.form-group__input[name="user-bday"]').mask('dD.mM.THDY', {
  translation: {
    "d": { pattern: /[0-3]/, recursive: true },
    "D": { pattern: /[0-9]/, recursive: true },
    "m": { pattern: /[0-1]/, recursive: true },
    "M": { pattern: /[0-9]/, recursive: true },
    "T": { pattern: /[1-2]/, recursive: true },
    "H": { pattern: /[9,0]/, recursive: true },
    "D": { pattern: /[0-9]/, recursive: true },
    "Y": { pattern: /[0-9]/, recursive: true },
	}
});

$('.form-group__input[type="email"]').mask("A", {
	translation: {
		"A": { pattern: /[\w@\-.+]/, recursive: true }
	}
});