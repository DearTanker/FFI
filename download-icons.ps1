# Download all OrcaSlicer icon files
$baseUrl = "https://raw.githubusercontent.com/OrcaSlicer/OrcaSlicer/main/resources/images"
$iconDir = ".\Workers\public\icons"

# Create directory if it doesn't exist
if (!(Test-Path $iconDir)) {
    New-Item -ItemType Directory -Path $iconDir | Out-Null
    Write-Host "Created directory: $iconDir"
}

# Tab Page Icons (Primary)
$tabIcons = @(
    "custom-gcode_filament.svg",
    "custom-gcode_cooling_fan.svg",
    "custom-gcode_setting_override.svg",
    "custom-gcode_advanced.svg",
    "custom-gcode_multi_material.svg",
    "advanced.svg",
    "custom-gcode_note.svg",
    "custom-gcode_quality.svg",
    "custom-gcode_strength.svg",
    "custom-gcode_speed.svg",
    "custom-gcode_support.svg",
    "custom-gcode_other.svg",
    "custom-gcode_object-info.svg",
    "custom-gcode_gcode.svg",
    "custom-gcode_extruder.svg",
    "custom-gcode_motion.svg"
)

# Group Icons (Optional)
$groupIcons = @(
    "param_information.svg",
    "param_flow_ratio_and_pressure_advance.svg",
    "param_chamber_temp.svg",
    "param_extruder_temp.svg",
    "param_bed_temp.svg",
    "param_volumetric_speed.svg",
    "param_cooling_fan.svg",
    "param_cooling_aux_fan.svg",
    "param_cooling_part_fan.svg",
    "param_cooling_specific_layer.svg",
    "param_cooling_exhaust.svg",
    "param_retraction.svg",
    "param_ironing.svg",
    "param_gcode.svg",
    "param_tower.svg",
    "param_toolchange.svg",
    "param_toolchange_multi_extruder.svg",
    "param_dependencies_printers.svg",
    "param_dependencies_presets.svg",
    "param_note.svg"
)

$allIcons = $tabIcons + $groupIcons
$successCount = 0
$failCount = 0

Write-Host "Downloading $($allIcons.Count) icon files..."
Write-Host "======================================"

foreach ($icon in $allIcons) {
    $url = "$baseUrl/$icon"
    $filePath = Join-Path $iconDir $icon
    
    try {
        $response = Invoke-WebRequest -Uri $url -OutFile $filePath -ErrorAction Stop
        Write-Host "[✓] Downloaded: $icon"
        $successCount++
    }
    catch {
        Write-Host "[✗] Failed: $icon - $($_.Exception.Message)"
        $failCount++
    }
    
    # Small delay to avoid rate limiting
    Start-Sleep -Milliseconds 200
}

Write-Host "======================================"
Write-Host "Download Summary: $successCount succeeded, $failCount failed"

if ($failCount -eq 0) {
    Write-Host "All icons downloaded successfully!" -ForegroundColor Green
}
