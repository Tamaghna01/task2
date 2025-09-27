document.addEventListener('DOMContentLoaded', () => {

    // ===========================================
    // Task 2: Add JavaScript Form Validation
    // ===========================================
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const successMessageDiv = document.getElementById('form-success');

    // Utility function to display/hide error messages
    function setError(inputElement, message) {
        const parentGroup = inputElement.closest('.form-group');
        const errorSpan = document.getElementById(`${inputElement.id}-error`);
        
        if (message) {
            parentGroup.classList.add('invalid');
            errorSpan.textContent = message;
        } else {
            parentGroup.classList.remove('invalid');
            errorSpan.textContent = '';
        }
    }

    // Main Validation Logic
    function validateForm(e) {
        e.preventDefault(); // Stop default HTML submission
        let isValid = true;
        successMessageDiv.textContent = ''; // Clear previous success messages

        // 1. Name Validation (Required)
        if (nameInput.value.trim() === '') {
            setError(nameInput, 'Name is required.');
            isValid = false;
        } else {
            setError(nameInput, '');
        }

        // 2. Email Validation (Required + Format)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            setError(emailInput, 'Email is required.');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            setError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        } else {
            setError(emailInput, '');
        }

        // 3. Message Validation (Required)
        if (messageTextarea.value.trim() === '') {
            setError(messageTextarea, 'Message is required.');
            isValid = false;
        } else {
            setError(messageTextarea, '');
        }

        // Handle successful submission
        if (isValid) {
            // In a real app, you would send data to a server here.
            successMessageDiv.textContent = 'Message sent successfully! (Form data cleared)';
            form.reset(); // Clear the form fields
            
            // Clear the success message after a few seconds
            setTimeout(() => {
                successMessageDiv.textContent = '';
            }, 5000);
        }
    }

    form.addEventListener('submit', validateForm);


    // ===========================================
    // Task 4: Develop a Dynamic To-Do List
    // ===========================================
    const taskInput = document.getElementById('newTaskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create the necessary elements
        const li = document.createElement('li');
        const span = document.createElement('span'); // Use span for text content
        const deleteBtn = document.createElement('button');

        // Set content and attributes
        span.textContent = taskText;
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';

        // Add event listener to the delete button
        deleteBtn.addEventListener('click', function() {
            // Remove the parent li element
            li.remove(); 
        });

        // Assemble the list item
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Add the new item to the list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Event listeners for adding a task
    addTaskButton.addEventListener('click', addTask);

    // Allow adding tasks with the Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

});