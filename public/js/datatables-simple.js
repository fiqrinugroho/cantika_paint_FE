window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new DataTable(datatablesSimple,{
            responsive: true,
        });
        
    }

    const datatablesSimple2 = document.getElementById('datatablesSimple2');
    if (datatablesSimple2) {
        new DataTable(datatablesSimple2, {
            responsive: true
        });
    }

    const datatablesBarang = document.getElementById('datatablesBarang');
    if (datatablesBarang) {
        new DataTable(datatablesBarang, {
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf'
            ],
            responsive: true,
            paging: true 
        });
    }

    const datatablesSale = document.getElementById('datatablesSale');
    if (datatablesSale) {
        new DataTable(datatablesSale, {
            scrollX: true,
            paging: false,
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf'
            ],
            searching: false
        });
    }
    
});
