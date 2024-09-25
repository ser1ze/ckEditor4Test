CKEDITOR.plugins.add("autopagebreak", {
    init: function (editor) {
        var A4_HEIGHT = 1022; 
        var lastPageBreakPosition = 0; 
        var pageBreakInserted = false; 
        var pageCounter = 1; 

        function insertPageBreakIfNeeded() {
            var body = editor.document.getBody();
            var contentHeight = body.$.scrollHeight;

            if (contentHeight - lastPageBreakPosition > A4_HEIGHT && !pageBreakInserted) {
             
                var pageNumberHtml = `<div style="text-align: center; font-weight: bold; margin-bottom: 20px;">${pageCounter}</div>`;
                
              
                var tempDiv = editor.document.createElement('div');
                tempDiv.setHtml(pageNumberHtml);
                
              
                editor.insertElement(tempDiv);

              
                editor.execCommand('pagebreak');

                lastPageBreakPosition = contentHeight; 
                pageBreakInserted = true; 
                pageCounter++; 
            } else if (contentHeight - lastPageBreakPosition <= A4_HEIGHT) {
                pageBreakInserted = false;
            }
        }

        editor.on("contentDom", function () {
            var editable = editor.editable();
            editable.attachListener(editable, "input", function () {
                insertPageBreakIfNeeded();
            });
            editable.attachListener(editable, "keyup", function () {
                insertPageBreakIfNeeded();
            });
            editable.attachListener(editable, "paste", function () {
                setTimeout(insertPageBreakIfNeeded, 0);
            });
        });
    },
});
