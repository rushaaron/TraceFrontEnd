print('yeet')



###

    <!-- Script for Image Preview -->
    <script>
        const fileInput = document.getElementById('file-input');
        const imagePreview = document.getElementById('preview');

        fileInput.addEventListener('change', function () {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                imagePreview.src = '';
            }
        });
    </script>