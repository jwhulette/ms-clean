
module.exports =
    activate: ->
        atom.commands.add 'atom-text-editor', 'ms-clean:replace', ->
            editor = atom.workspace.getActiveTextEditor()
            replace(editor)

replace = (editor) ->
    if editor.getSelectedText()
        text = editor.getSelectedText()
        editor.insertText(doreplacement(text))
    else
        text = editor.getText()
        editor.setText(doreplacement(text))

doreplacement = (text) ->

    single_quote = "'"
    double_quote = '''"'''
    two_em_dash = "&#11834;"
    em_dash = "&#8212;"

    text = text.replace /[\u2018\u2019]/g, ($0) -> single_quote
    text = text.replace /[\u201C\u201D]/g, ($0) -> double_quote
    text = text.replace /[\u2014]/g, ($0) -> em_dash
    text = text.replace /[\u2E3A]/g, ($0) -> two_em_dash

    # misc chars
    text = text.replace /[\u00A9]/g, "&copy;"
    text = text.replace /[\u00AE]/g, "&reg;"
    text = text.replace /[\u2122]/g, "&trade;"

    return text
