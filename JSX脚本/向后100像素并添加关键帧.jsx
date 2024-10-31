(function() {
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length > 0) {
            app.beginUndoGroup("增加位置X并添加关键帧");
            for (var i = 0; i < selectedLayers.length; i++) {
                var layer = selectedLayers[i];
                var posProp = layer.transform.position;
                var pos = posProp.value;
                
                // 设置新的位置值
                posProp.setValueAtTime(comp.time, [pos[0] - 100, pos[1], pos[2]]);
                
                // 添加关键帧
                posProp.setValuesAtTimes([comp.time], [[pos[0] - 100, pos[1], pos[2]]]);
            }
            app.endUndoGroup();
        } else {
            alert("请选择至少一个图层。");
        }
    } else {
        alert("请在 After Effects 中打开一个项目并选择一个合成。");
    }
})();
