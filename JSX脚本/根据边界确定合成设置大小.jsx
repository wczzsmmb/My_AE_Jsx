// 获取活动合成
var comp = app.project.activeItem;

if (comp && comp instanceof CompItem) {
    app.beginUndoGroup("Resize Composition");

    // 初始化合成边界
    var minX = comp.width;
    var minY = comp.height;
    var maxX = 0;
    var maxY = 0;

    // 遍历所有图层，确定最大和最小边界值
    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i);
        var layerBounds = layer.sourceRectAtTime(comp.time, false);

        minX = Math.min(minX, layer.transform.position.value[0] - layerBounds.width / 2);
        minY = Math.min(minY, layer.transform.position.value[1] - layerBounds.height / 2);
        maxX = Math.max(maxX, layer.transform.position.value[0] + layerBounds.width / 2);
        maxY = Math.max(maxY, layer.transform.position.value[1] + layerBounds.height / 2);
    }

    // 计算新的合成高度和宽度，加上冗余
    var newWidth = Math.ceil(maxX - minX + 200); // 预留200像素冗余
    var newHeight = Math.ceil(maxY - minY + 200);
    
    // 设置新的合成尺寸
    comp.width = newWidth;
    comp.height = newHeight;

    app.endUndoGroup();
} else {
    alert("请先选择一个合成项目！");
}