Array.prototype.myForEach = myForEach
Array.prototype.myMap = myMap
Array.prototype.mySort = mySort

function myForEach (callback) {
  for (let i = 0; i < this.length; i++) { callback(this[i], i, this) }
}

function myMap (callback) {
  const result = []
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this))
  }
  return result
}

function mySort (callback) {
  const length = this.length
  let iteration = 1
  for (let i = 0; i < length; i++) {
  	let transposition = 0
  	for (let i = 0; i < length - iteration; i++) {
  		if (callback(this[i], this[i + 1]) > 0) {
  			[this[i], this[i + 1]] = [this[i + 1], this[i]]
  			transposition++
  		}
  	}
  	if (!transposition) {
  		break
  	} else {
  		iteration++
  	}
  }
  return this
}
