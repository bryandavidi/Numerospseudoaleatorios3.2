export const data = [0.55128,	0.02763,	0.02586,	0.81951,	0.16822,
    0.08120,	0.42124,	0.60443,	0.24112,	0.44468,
    0.43824,	0.86939,	0.32749,	0.67358,	0.02773,
    0.51062,	0.89123,	0.03964,	0.97269,	0.01262,
    0.19055,	0.61298,	0.00582,	0.69000,	0.33457,
    0.38021,	0.18034,	0.96407,	0.80624,	0.89393,
    0.98098,	0.63872,	0.94620,	0.53548,	0.11942,
    0.95180,	0.65438,	0.08145,	0.37843,	0.88452,
    0.99576,	0.87011,	0.21574,	0.83764,	0.80858,
    0.98903,	0.84042,	0.08995,	0.83428,	0.65488,
    ]

    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object

        console.log(files[0])

        var reader = new FileReader();


        reader.onload = (function(file){
          var enc = new TextDecoder("utf-8");
          let values = enc.decode(file.target.result);
          data = values.split(',')
        })

        content = reader.readAsArrayBuffer(files[0])
        console.log(content)

        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
          output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate.toLocaleDateString(), '</li>');
        }
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
      }

      document.getElementById('files').addEventListener('change', handleFileSelect, false);
    
    
      