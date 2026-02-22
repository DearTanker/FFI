# BambuStudio Filament Settings Structure

> 本文档严格根据BambuStudio源码（TabFilament::build、add_filament_overrides_page等）整理，所有标签页、分组、参数顺序均与原UI一致，便于开发与UI复刻。

---

## 标签页与分组结构

### 1. Filament（耗材丝）
#### Basic information（基础信息）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| filament_type | Type | 类型 |
| filament_vendor | Vendor | 供应商 |
| filament_soluble | Soluble material | 可溶性材料 |
| filament_is_support | Support material | 支撑材料 |
| impact_strength_z | Impact strength (Z) | Z方向冲击强度 |
| required_nozzle_HRC | Required nozzle HRC | 喷嘴硬度要求 |
| default_filament_colour | Default color | 默认颜色 |
| filament_diameter | Diameter | 直径 |
| filament_adhesiveness_category | Adhesiveness category | 粘性分类 |
| filament_flow_ratio | Flow ratio | 流量比例 |
| enable_pressure_advance | Enable pressure advance | 启用压力提前 |
| pressure_advance | Pressure advance | 压力提前 |
| filament_density | Filament density | 密度 |
| filament_shrink | Shrinkage (XY) | 收缩率（XY） |
| filament_velocity_adaptation_factor | Velocity adaptation factor | 速度自适应因子 |
| filament_cost | Price | 价格 |
| temperature_vitrification | Softening temperature | 软化温度 |
| filament_cooling_before_tower | Cooling before tower | 擦拭前冷却 |
| filament_tower_interface_pre_extrusion_dist | Interface layer pre-extrusion distance | 接触层预挤出距离 |
| filament_tower_interface_pre_extrusion_length | Interface layer pre-extrusion length | 接触层预挤出长度 |
| filament_tower_ironing_area | Tower ironing area | 色塔熨烫区域 |
| filament_tower_interface_purge_volume | Interface layer purge length | 接触层清理长度 |
| filament_tower_interface_print_temp | Interface layer print temperature | 接触层打印温度 |
| filament_prime_volume | Filament prime volume | 耗材灌注体积 |
| filament_prime_volume_nc | Filament prime volume (non-toolchange) | 耗材灌注体积（非换色） |
| filament_change_length | Filament ramming length | 耗材冲击长度 |
| filament_change_length_nc | Filament ramming length (non-toolchange) | 耗材冲击长度（非换色） |
| filament_ramming_travel_time | Ramming travel time | 冲击后空驶时间 |
| filament_ramming_travel_time_nc | Ramming travel time (non-toolchange) | 冲击后空驶时间（非换色） |
| filament_pre_cooling_temperature | Precooling target temperature | 预冷目标温度 |
| filament_pre_cooling_temperature_nc | Precooling target temperature (non-toolchange) | 预冷目标温度（非换色） |
| nozzle_temperature_range_low | Nozzle temperature range (Min) | 建议喷嘴温度（最小） |
| nozzle_temperature_range_high | Nozzle temperature range (Max) | 建议喷嘴温度（最大） |

#### Print temperature（打印温度）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| chamber_temperatures | Activate temperature control | 激活温度控制 |
| supertack_plate_temp_initial_layer | Supertack plate initial layer | 低温打印板（超强粘附）首层 |
| supertack_plate_temp | Supertack plate other layers | 低温打印板（超强粘附）其它层 |
| cool_plate_temp_initial_layer | Cool plate initial layer | 低温打印板首层 |
| cool_plate_temp | Cool plate other layers | 低温打印板其它层 |
| eng_plate_temp_initial_layer | Engineering plate initial layer | 工程板首层 |
| eng_plate_temp | Engineering plate other layers | 工程板其它层 |
| hot_plate_temp_initial_layer | Hot plate initial layer | 高温打印板首层 |
| hot_plate_temp | Hot plate other layers | 高温打印板其它层 |
| textured_plate_temp_initial_layer | Textured PEI plate initial layer | 纹理PEI热床首层 |
| textured_plate_temp | Textured PEI plate other layers | 纹理PEI热床其它层 |
| nozzle_temperature_initial_layer | Nozzle (Initial layer) | 喷嘴（首层） |
| nozzle_temperature | Nozzle (Other layers) | 喷嘴（其它层） |

#### Volumetric speed limitation（体积速度限制）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| filament_adaptive_volumetric_speed | Adaptive volumetric speed | 自适应体积速度 |
| filament_max_volumetric_speed | Max volumetric speed | 最大体积速度 |
| filament_ramming_volumetric_speed | Ramming volumetric speed | 尖端成型加载速度 |
| filament_ramming_volumetric_speed_nc | Ramming volumetric speed (non-toolchange) | 尖端成型加载速度（非换色） |

#### Filament scarf seam settings（耗材拼接缝设置）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| filament_scarf_seam_type | Scarf seam type | 拼接缝类型 |
| filament_scarf_height | Scarf seam height | 拼接缝高度 |
| filament_scarf_gap | Scarf seam gap | 拼接缝间隙 |
| filament_scarf_length | Scarf seam length | 拼接缝长度 |

### 2. Cooling（冷却）
#### Cooling for specific layer（特定层冷却）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| close_fan_the_first_x_layers | No cooling for the first | 关闭冷却对前 |
| first_x_layer_fan_speed | First layer fan speed | 首层风扇速度 |

#### Part cooling fan（部件冷却风扇）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| fan_min_speed | Min fan speed threshold (Fan speed) | 最小风扇速度阈值（风扇速度） |
| fan_cooling_layer_time | Min fan speed threshold (Layer time) | 最小风扇速度阈值（层时间） |
| fan_max_speed | Max fan speed threshold (Fan speed) | 最大风扇速度阈值（风扇速度） |
| slow_down_layer_time | Max fan speed threshold (Layer time) | 最大风扇速度阈值（层时间） |
| reduce_fan_stop_start_freq | Keep fan always on | 保持风扇常开 |
| slow_down_for_layer_cooling | Slow printing down for better layer cooling | 降低打印速度 以得到更好的冷却 |
| no_slow_down_for_cooling_on_outwalls | Don't slow down outer walls | 不减速外墙 |
| slow_down_min_speed | Min print speed | 最小打印速度 |
| enable_overhang_bridge_fan | Force cooling for overhangs and bridges | 悬垂/桥接强制冷却 |
| overhang_fan_threshold | Overhang cooling activation threshold | 悬垂冷却激活阈值 |
| overhang_threshold_participating_cooling | Overhang threshold participating cooling | 悬垂阈值参与冷却 |
| overhang_fan_speed | Overhangs and external bridges fan speed | 悬垂和外部桥接风扇速度 |
| pre_start_fan_time | Pre-start fan time | 启动前风扇时间 |

#### Auxiliary part cooling fan（辅助部件冷却风扇）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| additional_cooling_fan_speed | Fan speed | 风扇速度 |

#### Exhaust fan（排气风扇）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| activate_air_filtration | Activate air filtration | 启用空气过滤/排气 |
| during_print_exhaust_fan_speed | During print | 打印中 |
| complete_print_exhaust_fan_speed | Complete print | 完成打印 |

### 3. Setting Overrides（参数覆盖）
#### Retraction（回抽）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| filament_retraction_length | Length | 长度 |
| filament_z_hop | Z hop | Z抬升高度 |
| filament_z_hop_types | Z hop type | Z抬升类型 |
| filament_retraction_speed | Retraction speed | 回抽速度 |
| filament_deretraction_speed | Deretraction speed | 重新装填速度 |
| filament_retract_length_nc | Retraction length (non-toolchange) | 回抽长度（非换色） |
| filament_retract_restart_extra | Extra length on restart | 额外回填长度 |
| filament_retraction_minimum_travel | Travel distance threshold | 空驶距离阈值 |
| filament_retract_when_changing_layer | Retract when changing layer | 换层时回抽 |
| filament_wipe | Wipe | 回抽时擦拭 |
| filament_wipe_distance | Wipe distance | 擦拭距离 |
| filament_retract_before_wipe | Retract before wipe | 擦拭前的回抽量 |
| filament_long_retractions_when_cut | Long retraction when cut | 切料时回抽（实验） |
| filament_retraction_distances_when_cut | Retraction distance when cut | 切料回抽距离 |

#### Speed（速度）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| override_process_overhang_speed | Override process overhang speed | 覆盖悬垂速度 |
| filament_enable_overhang_speed | Enable overhang speed | 启用悬垂速度 |
| filament_overhang_1_4_speed | Overhang 1/4 speed | 悬垂1/4速度 |
| filament_overhang_2_4_speed | Overhang 2/4 speed | 悬垂2/4速度 |
| filament_overhang_3_4_speed | Overhang 3/4 speed | 悬垂3/4速度 |
| filament_overhang_4_4_speed | Overhang 4/4 speed | 悬垂4/4速度 |
| filament_overhang_totally_speed | Overhang totally speed | 悬垂极限速度 |
| filament_bridge_speed | Bridge speed | 桥接速度 |

### 4. Advanced（高级）
#### Filament start G-code（耗材丝起始G-code）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| filament_start_gcode | Start G-code | 耗材丝起始G-code |

#### Filament end G-code（耗材丝结束G-code）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| filament_end_gcode | End G-code | 耗材丝结束G-code |

### 5. Notes（备注）
#### Notes（备注）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| filament_notes | Notes | 备注 |

### 6. Multi Filament（多耗材）
#### Multi Filament（多耗材）
| 参数名 | 英文名 | 中文名 |
|--------|--------|--------|
| long_retractions_when_ec | Long retractions when EC | EC切料回抽 |
| retraction_distances_when_ec | Retraction distances when EC | EC切料回抽距离 |

---

> 所有标签页、分组、参数均严格按源码整理。如需继续补充其它页面或参数，请继续说明。
