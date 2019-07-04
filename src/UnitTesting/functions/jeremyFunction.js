module.exports = {
    add: function( num1, num2 ) {
        return num1 + num2;
      },
    archive: function() {axios
            .put(`/api/archive/${id}`)
            .then((res) => res.data)
            .catch((err) => console.log("archive error", err))
        getData()
    },
    shiftScore: function(num1, num2) {
        return num1 / num2 * 100
      } 

    }
