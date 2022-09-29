
function emailIsValid(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function save(){
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let mssv = document.getElementById('mssv').value;
    let trangthai ='';

    if(document.getElementById('mat').checked){
        trangthai = document.getElementById('mat').value;
    }else if(document.getElementById('muon').checked){
        trangthai = document.getElementById('muon').value;
    }

    if(_.isEmpty(fullname)){
        fullname = '';
        document.getElementById('error-fullname').innerHTML = 'Vui lòng nhập họ và tên!';
    }else{
        document.getElementById('error-fullname').innerHTML= '';
    }

    if(_.isEmpty(email)){
        email ='';
        document.getElementById('error-email').innerHTML = 'Vui lòng nhập email!';
    }
        else if(!emailIsValid(email)){
            email='';
            document.getElementById('error-email').innerHTML = 'Email không đúng địng dạng!';
        }
    else{
        document.getElementById('error-email').innerHTML= '';
    }

    if(_.isEmpty(mssv)){
        mssv ='';
        document.getElementById('error-mssv').innerHTML = 'Vui lòng nhập mssv!';
    }
        else if(mssv.trim().length <= 2){
            mssv ='';
            document.getElementById('error-mssv').innerHTML = 'MSSV không đúng!';
        }
    else{
        document.getElementById('error-mssv').innerHTML= '';
    }
    if(_.isEmpty(trangthai)){
        trangthai = '';
        document.getElementById('error-trangthai').innerHTML = 'Vui lòng chọn trạng thái!'
    }else{
        document.getElementById('error-trangthai').innerHTML = '';
    }


    if(fullname && email && mssv && trangthai){
        let students = sessionStorage.getItem('students') ? JSON.parse(sessionStorage.getItem('students')) :[];
        students.push({
            fullname:fullname,
            email:email,
            mssv:mssv,
            trangthai:trangthai,
        });

        sessionStorage.setItem('students', JSON.stringify(students));
        this.inliststudent();
    }
}


function inliststudent(){
    let students = sessionStorage.getItem('students') ?  JSON.parse(sessionStorage.getItem('students')) : [];
console.log(students.length);
if(students.length === 0 )
{ 
    document.getElementById('list-diemdanh').style.display = 'none';
    return false;
}

    document.getElementById('list-diemdanh').style.display = 'block';

    let table = `<tr>
    <td>STT</td>
    <td>Họ và tên</td>
    <td>MSSV</td>
    <td>Trạng thái</td> </tr>`;
students.forEach((student,index) =>{
    let labletrangthai = parseInt(student.trangthai) === 1 ? 'Có mặt' : 'Đến muộn';
    index++;
    table +=`<tr>
    <td>${index}</td>
    <td>${student.fullname}</td>
    <td>${student.mssv}</td>
    <td>${labletrangthai}</td>
</tr>`;
})
document.getElementById('diemdanh').innerHTML = table;
}

