describe("hotKeyService", function() {

  it("should execute call back if keycode matches", function() {
    var callBack = jasmine.createSpy('callBack');

    hotKeyService.registerCallBackForHotKey("ArrowLeft", callBack);

    event = new KeyboardEvent("keydown", {key: "ArrowLeft"});
    document.dispatchEvent(event);

    expect(callBack).toHaveBeenCalled();
  });

  it("should not execute call back if keycode does not match", function() {
    var callBack = jasmine.createSpy('callBack');

    hotKeyService.registerCallBackForHotKey(1, callBack);

    var event = new KeyboardEvent("keydown", {"key": "ArrowLeft"});
    var canceled = document.dispatchEvent(event);

    expect(callBack).not.toHaveBeenCalled();
  });

});
