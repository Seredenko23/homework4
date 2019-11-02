function Constructor (firstProp, secondProp) {
 	let _firstProp = firstProp
 	let _secondProp = secondProp

 	function setFirstValue (val) {
 		_firstProp = val
 	}

 	function setSecondValue (val) {
 		_secondProp = val
 	}

  return {
    getFirst: function () {
      return _firstProp
    },

    getSecond: function () {
      return _secondProp
    },

    setFirst: function (val) {
      setFirstValue(val)
    },

    setSecond: function (val) {
      setSecondValue(val)
    }
 	}
}
