CKEDITOR.editorConfig = function(config) {
    config.extraPlugins = 'autopagebreak';

    // Подключаем стили
    config.contentsCss = [
      
        CKEDITOR.basePath + 'plugins/autopagebreak/autopagebreak.css' // Ваш файл стилей
		
    ];
	config.width = 794
	
};
