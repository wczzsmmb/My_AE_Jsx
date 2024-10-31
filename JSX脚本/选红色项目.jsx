{
    function selectRedLabelLayers() {
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            alert("请先选择一个合成。");
            return;
        }

        app.beginUndoGroup("Select Red Label Layers");

        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);
            if (layer.label === 1) { // 2 是红色标签的默认值
                layer.selected = true;
            } else {
                layer.selected = false;
            }
        }

        app.endUndoGroup();
    }

    selectRedLabelLayers();
}
