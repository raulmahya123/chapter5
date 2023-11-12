document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const data = {
            username: username,
            password: password,
            role: 'user'
        };

        fetch('https://asia-southeast2-testlogin-366704.cloudfunctions.net/createacount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Berhasil, lanjutkan ke tahap berikutnya
            } else {
                throw new Error('Gagal mengirim permintaan.'); // Gagal, lempar kesalahan
            }
        })
        .then(data => {
            console.log('Berhasil: ' + JSON.stringify(data, null, 2));
            // Redirect to loginadmin.html
            window.location.href = 'loginadmin.html';
        })
        .catch(error => {
            console.error('Gagal: ' + error);
        });
    });
});
