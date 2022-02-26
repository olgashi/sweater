export function allWordsWoUpper(arr) {
  return arr.split(' ').map(word => word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ');
}

export function determineUVSevereness(uv) {
  const roundedUV = Math.round(parseFloat(uv));
  if (roundedUV >= 11) {
    return 'Extremely High';
  } else if (roundedUV >= 8) {
    return 'Very High';
  } else if (roundedUV >= 6) {
    return 'High';
  } else if (roundedUV >= 3) {
    return 'Medium';
  } else if (roundedUV >= 0) {
    return 'Low';
  } else {
    return 'Unknown value'
  }
}
