document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mainContent = document.querySelector('main');
    let isSidebarOpen = false;

    // Function to toggle sidebar
    const toggleSidebar = () => {
        isSidebarOpen = !isSidebarOpen;
        if (isSidebarOpen) {
            sidebar.style.transform = 'translateX(0)';
            mainContent.style.marginLeft = '16rem';
            sidebarToggle.style.transform = 'translateX(16rem)';
        } else {
            sidebar.style.transform = 'translateX(-100%)';
            mainContent.style.marginLeft = '0';
            sidebarToggle.style.transform = 'translateX(0)';
        }
    };

    // Add click event to toggle button
    sidebarToggle.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (isSidebarOpen && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target)) {
            toggleSidebar();
        }
    });

    // Close sidebar when clicking on a link
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isSidebarOpen) {
                toggleSidebar();
            }
        });
    });

    // Dynamic navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#sidebar nav a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('font-bold', 'text-orange-500');
                    } else {
                        link.classList.remove('font-bold', 'text-orange-500');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add copy functionality to all code blocks
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const codeBlock = button.parentElement.querySelector('code');
            const code = codeBlock.textContent;
            
            try {
                await navigator.clipboard.writeText(code);
                
                // Change icon to checkmark temporarily
                const icon = button.querySelector('i');
                icon.classList.remove('fa-copy');
                icon.classList.add('fa-check');
                
                // Change color to green
                button.classList.remove('text-gray-400', 'hover:text-orange-500');
                button.classList.add('text-green-500');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-copy');
                    button.classList.remove('text-green-500');
                    button.classList.add('text-gray-400', 'hover:text-orange-500');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        });
    });
}); 