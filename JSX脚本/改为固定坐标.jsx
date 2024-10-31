{
    function setLayerPosition() {
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            alert("请先选择一个合成。");
            return;
        }

        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length === 0) {
            alert("请先选中一个或多个图层。");
            return;
        }

        app.beginUndoGroup("Set Layer Position to 15, 25");

        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            var positionProperty = layer.property("Position");
            
            if (positionProperty !== null) {
                if (positionProperty.numKeys > 0) {
                    // 如果有关键帧，则遍历所有关键帧并设置位置
                    for (var j = 1; j <= positionProperty.numKeys; j++) {
                        positionProperty.setValueAtKey(j, [50, 110]);
                    }
                } else {
                    // 如果没有关键帧，则直接设置位置
                    positionProperty.setValue([50, 110]);
                }
            }
        }

        app.endUndoGroup();
    }

    setLayerPosition();
}
