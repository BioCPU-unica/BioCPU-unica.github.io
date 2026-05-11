// Generate DNA helix paths
function generateDNAHelix() {
    const svg = document.querySelector('.dna-header-animation svg');
    if (!svg) return; // Exit if element doesn't exist
    
    const width = 500;
    const height = 150;
    const amplitude = 50;
    const frequency = 10;
    const centerY = height / 2.5;
    const numBasePairs = 70;
    
    // Generate helix paths
    let path1 = '';
    let path2 = '';
    
    for (let x = 0; x <= width; x += 2) {
        const angle = (x / width) * Math.PI * 2 * frequency;
        const y1 = centerY + Math.sin(angle) * amplitude;
        const y2 = centerY - Math.sin(angle) * amplitude;
        
        if (x === 0) {
            path1 += `M ${x} ${y1}`;
            path2 += `M ${x} ${y2}`;
        } else {
            path1 += ` L ${x} ${y1}`;
            path2 += ` L ${x} ${y2}`;
        }
    }
    
    document.querySelector('.helix-path-1').setAttribute('d', path1);
    document.querySelector('.helix-path-2').setAttribute('d', path2);
    
    // Generate base pairs (covalent bonds)
    const basePairsGroup = document.querySelector('.base-pairs');
    basePairsGroup.innerHTML = '';
    
    for (let i = 0; i < numBasePairs; i++) {
        const x = (i / numBasePairs) * width;
        const angle = (x / width) * Math.PI * 2 * frequency;
        const y1 = centerY + Math.sin(angle) * amplitude;
        const y2 = centerY - Math.sin(angle) * amplitude;
        
        // Calculate the middle point and offset for the bond
        const midY = (y1 + y2) / 2;
        const bondLength = Math.abs(y1 - y2); // Shorter bond
        const offset = bondLength / 2;
        
        // Create covalent bond bar (shorter, not reaching the strands)
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('class', 'covalent-bond');
        line.setAttribute('x1', x);
        line.setAttribute('y1', midY - offset);
        line.setAttribute('x2', x);
        line.setAttribute('y2', midY + offset);
        line.setAttribute('stroke', '#00bfff');
        line.setAttribute('stroke-width', '0.2');
        line.setAttribute('stroke-linecap', 'round');
        
        basePairsGroup.appendChild(line);
        
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateDNAHelix);
} else {
    generateDNAHelix();
}