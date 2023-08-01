window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new DataTable(datatablesSimple,{
            scrollX: true,
            responsive: true,
        });
        
    }
    const datatablesSimple2 = document.getElementById('datatablesSimple2');
    if (datatablesSimple2) {
        new DataTable(datatablesSimple2, {
            scrollX: true,
            responsive: true
        });
    }

    const datatablesSale = document.getElementById('datatablesSale');
    if (datatablesSale) {
        new DataTable(datatablesSale, {
            scrollX: true,
            responsive: true,
            searchable: false, 
            paging: false
        });
    }
    
});
