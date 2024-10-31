var comp = app.project.activeItem;
if (comp == null || !(comp instanceof CompItem)) {
    alert("请先选择一个合成。");
} else {
    var layer = comp.selectedLayers[0];
    if (layer == null || !(layer instanceof ShapeLayer)) {
        alert("请先选择一个形状图层。");
    } else {
        var contents = layer.property("ADBE Root Vectors Group");
        for (var i = 1; i <= contents.numProperties; i++) {
            var propertyGroup = contents.property(i);
            $.writeln(propertyGroup.name); // 打印所有属性名称
        }
    }
}
