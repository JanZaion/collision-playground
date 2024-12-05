const collisionValidator = () => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const formGroupRef = control.parent as FormGroup;
    if (typeof formGroupRef === 'undefined') {
      return null;
    }
    const ref = formGroupRef.root;

    const gratingLoad = ref.get('grate').get('gratingLoad');
    const gratingLoadCollisions = {} as ValidationErrors;

    const gratingType = ref.get('grate').get('gratingType');
    const gratingTypeCollisions = {} as ValidationErrors;

    const gratingMaterial = ref.get('grate').get('material');
    const gratingMaterialCollisions = {} as ValidationErrors;

    const gratingSurface = ref.get('grate').get('surface');
    const gratingSurfaceCollisions = {} as ValidationErrors;

    const gratingSurfaceTreatment = ref.get('grate').get('surfaceTreatment');
    const gratingSurfaceTreatmentCollisions = {} as ValidationErrors;

    const meshSize = ref.get('grate').get('meshSize');
    const meshSizeCollisions = {} as ValidationErrors;

    const gratingHeight = ref.get('grate').get('gratingHeight');
    const gratingHeightCollisions = {} as ValidationErrors;

    const hasGrate = ref.get('hasGrate');

    const gully = ref.get('gully');

    const hasGully = ref.get('hasGully');
    const hasGullyCollisions = {} as ValidationErrors;

    const gullyDiameter = gully.get('diameter');
    const gullyDiameterCollisions = {} as ValidationErrors;

    const outletDirection = gully.get('outletDirection');
    const gullyOutletDirectionCollisions = {} as ValidationErrors;

    const gullyFlange = gully.get('gullyFlange');
    const gullyFlangeCollisions = {} as ValidationErrors;

    const gullyFlowRate = gully.get('gullyFlowRate');
    const gullyFlowRateCollisions = {} as ValidationErrors;

    const outlets = ref.get('channel').get('outlets') as FormArray;

    const outletDiameter = outlets.controls[0].get('diameter');
    const outletDiameterCollisions = {} as ValidationErrors;

    const outletLength = outlets.controls[0].get('length');
    const outletLengthCollisions = {} as ValidationErrors;

    const material = ref.get('channel').get('material');
    const materialCollisions = {} as ValidationErrors;

    const channelLength = ref.get('channel').get('length');

    const lengthLevellingFeet = ref.get('channel').get('lengthLevellingFeet');
    const lengthLevellingFeetCollisions = {} as ValidationErrors;

    const transportConnection = ref.get('channel').get('lengthTransportConnection');
    const transportConnectionCollisions = {} as ValidationErrors;

    if (typeof this.grates !== 'undefined') {
      // GRATE COLLISIONS

      if (gratingType.value) {
        let filteredGrates = this.grates?.filter((x) => x.type === gratingType.value);

        // GRATING TYPE / LOAD CLASS
        if (filteredGrates.length > 0 && gratingLoad.value) {
          filteredGrates = filteredGrates.filter((x) => x.loadClasses.includes(gratingLoad.value));

          if (filteredGrates.length === 0) {
            gratingLoadCollisions['collisionGratingType'] = { value: true };
            gratingTypeCollisions['collisionGratingLoad'] = { value: true };
          }
        }

        // GRATING TYPE / SURFACE
        if (filteredGrates.length > 0 && gratingSurface.value) {
          filteredGrates = filteredGrates.filter((x) => x.surfaces.includes(gratingSurface.value));

          if (filteredGrates.length === 0) {
            gratingSurfaceCollisions['collisionGratingType'] = { value: true };
            gratingTypeCollisions['collisionGratingSurface'] = { value: true };
          }
        }

        // GRATING TYPE / GRATE MATERIAL
        if (filteredGrates.length > 0 && gratingMaterial.value) {
          filteredGrates = filteredGrates.filter((x) => x.materialEN === gratingMaterial.value);

          if (filteredGrates.length === 0) {
            gratingMaterialCollisions['collisionGratingType'] = { value: true };
            gratingTypeCollisions['collisionGratingMaterial'] = { value: true };
          }
        }

        // GRATING TYPE / E
        if (gratingHeight.value && filteredGrates.length > 0) {
          filteredGrates = filteredGrates?.filter((x) => x.e === gratingHeight.value);

          if (filteredGrates.length === 0) {
            gratingTypeCollisions['collisionGratingHeight'] = { value: true };
            gratingHeightCollisions['collisionGratingType'] = { value: true };
          }
        }

        // GRATING TYPE / SURFACE TREATMENT
        if (gratingSurfaceTreatment.value && filteredGrates.length > 0) {
          filteredGrates = filteredGrates?.filter((x) => x.surfaceTreatment === gratingSurfaceTreatment.value);

          if (filteredGrates.length === 0) {
            gratingTypeCollisions['collisionGratingSurfaceTreatment'] = { value: true };
            gratingSurfaceTreatmentCollisions['collisionGratingType'] = { value: true };
          }
        }
      }

      if (meshSize.value) {
        let filteredGrates = this.grates?.filter((x) => x.meshSize === meshSize.value);

        // MESH SIZE / LOAD CLASS
        if (filteredGrates.length > 0 && gratingLoad.value) {
          filteredGrates = filteredGrates.filter((x) => x.loadClasses.includes(gratingLoad.value));

          if (filteredGrates.length === 0) {
            gratingLoadCollisions['collisionMeshSize'] = { value: true };
            meshSizeCollisions['collisionGratingLoad'] = { value: true };
          }
        }

        // MESH SIZE / SURFACE
        if (filteredGrates.length > 0 && gratingSurface.value) {
          filteredGrates = filteredGrates.filter((x) => x.surfaces.includes(gratingSurface.value));

          if (filteredGrates.length === 0) {
            gratingSurfaceCollisions['collisionMeshSize'] = { value: true };
            meshSizeCollisions['collisionGratingSurface'] = { value: true };
          }
        }

        // MESH SIZE / GRATE MATERIAL
        if (filteredGrates.length > 0 && gratingMaterial.value) {
          filteredGrates = filteredGrates.filter((x) => x.materialEN === gratingMaterial.value);

          if (filteredGrates.length === 0) {
            gratingMaterialCollisions['collisionMeshSize'] = { value: true };
            meshSizeCollisions['collisionGratingMaterial'] = { value: true };
          }
        }

        // MESH SIZE / E
        if (gratingHeight.value && filteredGrates.length > 0) {
          filteredGrates = filteredGrates?.filter((x) => x.e === gratingHeight.value);

          if (filteredGrates.length === 0) {
            meshSizeCollisions['collisionGratingHeight'] = { value: true };
            gratingHeightCollisions['collisionMeshSize'] = { value: true };
          }
        }

        // MESH SIZE / SURFACE TREATMENT
        if (gratingSurfaceTreatment.value && filteredGrates.length > 0) {
          filteredGrates = filteredGrates?.filter((x) => x.surfaceTreatment === gratingSurfaceTreatment.value);

          if (filteredGrates.length === 0) {
            meshSizeCollisions['collisionGratingSurfaceTreatment'] = { value: true };
            gratingSurfaceTreatmentCollisions['collisionMeshSize'] = { value: true };
          }
        }
      }

      if (gratingLoad.value) {
        let filteredGrates = this.grates?.filter((x) => x.loadClasses.includes(gratingLoad.value));

        // GRATING LOAD / GRATING TYPE
        if (filteredGrates.length > 0 && gratingType.value) {
          filteredGrates = filteredGrates.filter((x) => x.type === gratingType.value);

          if (filteredGrates.length === 0) {
            gratingTypeCollisions['collisionGratingLoad'] = { value: true };
            gratingLoadCollisions['collisionGratingType'] = { value: true };
          }
        }

        // GRATING LOAD / MESH SIZE
        if (filteredGrates.length > 0 && meshSize.value) {
          filteredGrates = filteredGrates.filter((x) => x.meshSize === meshSize.value);

          if (filteredGrates.length === 0) {
            meshSizeCollisions['collisionGratingLoad'] = { value: true };
            gratingLoadCollisions['collisionMeshSize'] = { value: true };
          }
        }

        // GRATING LOAD / SURFACE
        if (filteredGrates.length > 0 && gratingSurface.value) {
          filteredGrates = filteredGrates.filter((x) => x.surfaces.includes(gratingSurface.value));

          if (filteredGrates.length === 0) {
            gratingSurfaceCollisions['collisionGratingLoad'] = { value: true };
            gratingLoadCollisions['collisionGratingSurface'] = { value: true };
          }
        }

        // GRATING LOAD / GRATE MATERIAL
        if (filteredGrates.length > 0 && gratingMaterial.value) {
          filteredGrates = filteredGrates.filter((x) => x.materialEN === gratingMaterial.value);

          if (filteredGrates.length === 0) {
            gratingMaterialCollisions['collisionGratingLoad'] = { value: true };
            gratingLoadCollisions['collisionGratingMaterial'] = { value: true };
          }
        }

        // GRATING LOAD / E
        if (gratingHeight.value && filteredGrates.length > 0) {
          filteredGrates = filteredGrates?.filter((x) => x.e === gratingHeight.value);

          if (filteredGrates.length === 0) {
            gratingLoadCollisions['collisionGratingHeight'] = { value: true };
            gratingHeightCollisions['collisionGratingLoad'] = { value: true };
          }
        }

        // GRATING LOAD / SURFACE TREATMENT
        if (gratingSurfaceTreatment.value && filteredGrates.length > 0) {
          filteredGrates = filteredGrates?.filter((x) => x.surfaceTreatment === gratingSurfaceTreatment.value);

          if (filteredGrates.length === 0) {
            gratingLoadCollisions['collisionGratingSurfaceTreatment'] = { value: true };
            gratingSurfaceTreatmentCollisions['collisionGratingLoad'] = { value: true };
          }
        }
      }

      if (gratingSurface.value) {
        let filteredGrates = this.grates?.filter((x) => x.surfaces.includes(gratingSurface.value));

        // GRATING SURFACE / GRATING TYPE
        if (filteredGrates.length > 0 && gratingType.value) {
          filteredGrates = filteredGrates.filter((x) => x.type === gratingType.value);

          if (filteredGrates.length === 0) {
            gratingTypeCollisions['collisionGratingSurface'] = { value: true };
            gratingSurfaceCollisions['collisionGratingType'] = { value: true };
          }
        }

        // GRATING SURFACE / MESH SIZE
        if (filteredGrates.length > 0 && meshSize.value) {
          filteredGrates = filteredGrates.filter((x) => x.meshSize === meshSize.value);

          if (filteredGrates.length === 0) {
            meshSizeCollisions['collisionGratingSurface'] = { value: true };
            gratingSurfaceCollisions['collisionMeshSize'] = { value: true };
          }
        }

        // GRATING SURFACE / LOAD CLASS
        if (filteredGrates.length > 0 && gratingLoad.value) {
          filteredGrates = filteredGrates.filter((x) => x.loadClasses.includes(gratingLoad.value));

          if (filteredGrates.length === 0) {
            gratingLoadCollisions['collisionGratingSurface'] = { value: true };
            gratingSurfaceCollisions['collisionGratingLoad'] = { value: true };
          }
        }

        // GRATING SURFACE / GRATE MATERIAL
        if (filteredGrates.length > 0 && gratingMaterial.value) {
          filteredGrates = filteredGrates.filter((x) => x.materialEN === gratingMaterial.value);

          if (filteredGrates.length === 0) {
            gratingMaterialCollisions['collisionGratingSurface'] = { value: true };
            gratingSurfaceCollisions['collisionGratingMaterial'] = { value: true };
          }
        }

        // GRATING SURFACE / E
        if (gratingHeight.value && filteredGrates.length > 0) {
          filteredGrates = filteredGrates?.filter((x) => x.e === gratingHeight.value);

          if (filteredGrates.length === 0) {
            gratingSurfaceCollisions['collisionGratingHeight'] = { value: true };
            gratingHeightCollisions['collisionGratingSurface'] = { value: true };
          }
        }

        // GRATING SURFACE / SURFACE TREATMENT
        if (gratingSurfaceTreatment.value && filteredGrates.length > 0) {
          filteredGrates = filteredGrates?.filter((x) => x.surfaceTreatment === gratingSurfaceTreatment.value);

          if (filteredGrates.length === 0) {
            gratingSurfaceCollisions['collisionGratingSurfaceTreatment'] = { value: true };
            gratingSurfaceTreatmentCollisions['collisionGratingSurface'] = { value: true };
          }
        }
      }

      if (gratingMaterial.value) {
        let filteredGrates = this.grates?.filter((x) => x.materialEN === gratingMaterial.value);

        // GRATING MATERIAL / GRATING TYPE
        if (filteredGrates.length > 0 && gratingType.value) {
          filteredGrates = filteredGrates.filter((x) => x.type === gratingType.value);

          if (filteredGrates.length === 0) {
            gratingTypeCollisions['collisionGratingMaterial'] = { value: true };
            gratingMaterialCollisions['collisionGratingType'] = { value: true };
          }
        }

        // GRATING MATERIAL / MESH SIZE
        if (filteredGrates.length > 0 && meshSize.value) {
          filteredGrates = filteredGrates.filter((x) => x.meshSize === meshSize.value);

          if (filteredGrates.length === 0) {
            meshSizeCollisions['collisionGratingMaterial'] = { value: true };
            gratingMaterialCollisions['collisionMeshSize'] = { value: true };
          }
        }

        // GRATING MATERIAL / LOAD CLASS
        if (filteredGrates.length > 0 && gratingLoad.value) {
          filteredGrates = filteredGrates.filter((x) => x.loadClasses.includes(gratingLoad.value));

          if (filteredGrates.length === 0) {
            gratingLoadCollisions['collisionGratingMaterial'] = { value: true };
            gratingMaterialCollisions['collisionGratingLoad'] = { value: true };
          }
        }

        // GRATING MATERIAL / GRATE SURFACE
        if (filteredGrates.length > 0 && gratingSurface.value) {
          filteredGrates = filteredGrates.filter((x) => x.surfaces.includes(gratingSurface.value));

          if (filteredGrates.length === 0) {
            gratingSurfaceCollisions['collisionGratingMaterial'] = { value: true };
            gratingMaterialCollisions['collisionGratingSurface'] = { value: true };
          }
        }

        // GRATING MATERIAL / E
        if (gratingHeight.value && filteredGrates.length > 0) {
          filteredGrates = filteredGrates?.filter((x) => x.e === gratingHeight.value);

          if (filteredGrates.length === 0) {
            gratingMaterialCollisions['collisionGratingHeight'] = { value: true };
            gratingHeightCollisions['collisionGratingMaterial'] = { value: true };
          }
        }

        // GRATING MATERIAL / SURFACE TREATMENT
        if (gratingSurfaceTreatment.value && filteredGrates.length > 0) {
          filteredGrates = filteredGrates?.filter((x) => x.surfaceTreatment === gratingSurfaceTreatment.value);

          if (filteredGrates.length === 0) {
            gratingMaterialCollisions['collisionGratingSurfaceTreatment'] = { value: true };
            gratingSurfaceTreatmentCollisions['collisionGratingMaterial'] = { value: true };
          }
        }
      }

      if (gratingSurfaceTreatment.value) {
        let filteredGrates = this.grates?.filter((x) => x.surfaceTreatment === gratingSurfaceTreatment.value);

        // GRATING SURFACE TREATMENT / GRATING TYPE
        if (filteredGrates.length > 0 && gratingType.value) {
          filteredGrates = filteredGrates.filter((x) => x.type === gratingType.value);

          if (filteredGrates.length === 0) {
            gratingTypeCollisions['collisionGratingSurfaceTreatment'] = { value: true };
            gratingSurfaceTreatmentCollisions['collisionGratingType'] = { value: true };
          }
        }

        // GRATING SURFACE TREATMENT / MESH SIZE
        if (filteredGrates.length > 0 && meshSize.value) {
          filteredGrates = filteredGrates.filter((x) => x.meshSize === meshSize.value);

          if (filteredGrates.length === 0) {
            meshSizeCollisions['collisionGratingSurfaceTreatment'] = { value: true };
            gratingSurfaceTreatmentCollisions['collisionMeshSize'] = { value: true };
          }
        }

        // GRATING SURFACE TREATMENT / LOAD CLASS
        if (filteredGrates.length > 0 && gratingLoad.value) {
          filteredGrates = filteredGrates.filter((x) => x.loadClasses.includes(gratingLoad.value));

          if (filteredGrates.length === 0) {
            gratingLoadCollisions['collisionGratingSurfaceTreatment'] = { value: true };
            gratingSurfaceTreatmentCollisions['collisionGratingLoad'] = { value: true };
          }
        }

        // GRATING SURFACE TREATMENT / GRATE SURFACE
        if (filteredGrates.length > 0 && gratingSurface.value) {
          filteredGrates = filteredGrates.filter((x) => x.surfaces.includes(gratingSurface.value));

          if (filteredGrates.length === 0) {
            gratingSurfaceCollisions['collisionGratingSurfaceTreatment'] = { value: true };
            gratingSurfaceTreatmentCollisions['collisionGratingSurface'] = { value: true };
          }
        }

        // GRATING SURFACE TREATMENT / E
        if (gratingHeight.value && filteredGrates.length > 0) {
          filteredGrates = filteredGrates?.filter((x) => x.e === gratingHeight.value);

          if (filteredGrates.length === 0) {
            gratingSurfaceTreatmentCollisions['collisionGratingHeight'] = { value: true };
            gratingHeightCollisions['collisionGratingSurfaceTreatment'] = { value: true };
          }
        }

        // GRATING SURFACE TREATMENT / SURFACE MATERIAL
        if (gratingMaterial.value && filteredGrates.length > 0) {
          filteredGrates = filteredGrates?.filter((x) => x.materialEN === gratingMaterial.value);

          if (filteredGrates.length === 0) {
            gratingMaterialCollisions['collisionGratingSurfaceTreatment'] = { value: true };
            gratingSurfaceTreatmentCollisions['collisionGratingMaterial'] = { value: true };
          }
        }
      }
    }

    /// GULLY COLLISIONS ///
    if (typeof this.gullies !== 'undefined') {
      if (hasGully.value === true) {
        let filteredGullies = this.gullies;

        if (outletDiameter.value) {
          filteredGullies = filteredGullies.filter((x) => x.diameter === outletDiameter.value);

          if (material.value && filteredGullies.length !== 0) {
            filteredGullies = filteredGullies.filter((x) => x.materialEN === material.value);
            if (filteredGullies.length === 0) {
              if (Object.keys(outletDiameterCollisions).length === 0) {
                outletDiameterCollisions['collisionChannelMaterial'] = { value: true };
              }

              materialCollisions['collisionOutletDiameter'] = { value: true };
            }
          }
        }

        if (outletDirection.value) {
          filteredGullies = filteredGullies.filter((x) => x.direction === outletDirection.value);

          if (outletDiameter.value) {
            filteredGullies = filteredGullies.filter((x) => x.diameter === outletDiameter.value);

            if (filteredGullies.length === 0) {
              gullyOutletDirectionCollisions['collisionOutletDiameter'] = { value: true };
              outletDiameterCollisions['collisionOutletDirection'] = { value: true };
            }
          }

          if (gullyDiameter.value && filteredGullies.length !== 0) {
            filteredGullies = filteredGullies.filter((x) => x.dsmall === gullyDiameter.value);
            if (filteredGullies.length === 0) {
              if (Object.keys(gullyOutletDirectionCollisions).length === 0) {
                gullyOutletDirectionCollisions['collisionGullyDiameter'] = { value: true };
              }

              gullyDiameterCollisions['collisionOutletDirection'] = { value: true };
            }
          }

          if (gullyFlange.value && filteredGullies.length !== 0) {
            filteredGullies = filteredGullies.filter((x) => x.flange === gullyFlange.value);
            if (filteredGullies.length === 0) {
              if (Object.keys(gullyOutletDirectionCollisions).length === 0) {
                gullyOutletDirectionCollisions['collisionGullyFlange'] = { value: true };
              }

              gullyFlangeCollisions['collisionOutletDirection'] = { value: true };
            }
          }

          if (material.value && filteredGullies.length !== 0) {
            filteredGullies = filteredGullies.filter((x) => x.materialEN === material.value);
            if (filteredGullies.length === 0) {
              if (Object.keys(gullyOutletDirectionCollisions).length === 0) {
                gullyOutletDirectionCollisions['collisionChannelMaterial'] = { value: true };
              }

              materialCollisions['collisionOutletDirection'] = { value: true };
            }
          }
        }

        if (gullyDiameter.value) {
          filteredGullies = filteredGullies.filter((x) => x.dsmall === gullyDiameter.value);

          if (filteredGullies.length === 0) {
            if (outletDiameter.value) {
              outletDiameterCollisions['collisionGullyDiameter'] = { value: true };
              gullyDiameterCollisions['collisionOutletDiameter'] = { value: true };
            }
          }

          if (material.value && filteredGullies.length !== 0) {
            filteredGullies = filteredGullies.filter((x) => x.materialEN === material.value);
            if (filteredGullies.length === 0) {
              if (Object.keys(gullyDiameterCollisions).length === 0) {
                gullyDiameterCollisions['collisionChannelMaterial'] = { value: true };
              }

              materialCollisions['collisionGullyDiameter'] = { value: true };
            }
          }
        }

        if (gullyFlowRate.value) {
          filteredGullies = filteredGullies.filter((x) => x.flowRate === gullyFlowRate.value);

          if (outletDiameter.value) {
            filteredGullies = filteredGullies.filter((x) => x.diameter === outletDiameter.value);
            if (filteredGullies.length === 0) {
              gullyFlowRateCollisions['collisionOutletDiameter'] = { value: true };
              outletDiameterCollisions['collisionGullyFlowRate'] = { value: true };
            }
          }

          if (gullyDiameter.value) {
            filteredGullies = filteredGullies?.filter((x) => x.dsmall === gullyDiameter.value);
            if (filteredGullies.length === 0) {
              gullyFlowRateCollisions['collisionGullyDiameter'] = { value: true };
              gullyDiameterCollisions['collisionGullyFlowRate'] = { value: true };
            }
          }

          if (gullyFlange.value && filteredGullies.length !== 0) {
            filteredGullies = filteredGullies.filter((x) => x.flange === gullyFlange.value);
            if (filteredGullies.length === 0) {
              if (Object.keys(gullyFlowRateCollisions).length === 0) {
                gullyFlowRateCollisions['collisionGullyFlange'] = { value: true };
              }

              gullyFlangeCollisions['collisionGullyFlowRate'] = { value: true };
            }
          }

          if (outletDirection.value && filteredGullies.length !== 0) {
            filteredGullies = filteredGullies.filter((x) => x.direction === outletDirection.value);
            if (filteredGullies.length === 0) {
              if (Object.keys(gullyFlowRateCollisions).length === 0) {
                gullyFlowRateCollisions['collisionOutletDirection'] = { value: true };
              }

              gullyOutletDirectionCollisions['collisionGullyFlowRate'] = { value: true };
            }
          }

          if (material.value && filteredGullies.length !== 0) {
            filteredGullies = filteredGullies.filter((x) => x.materialEN === material.value);
            if (filteredGullies.length === 0) {
              if (Object.keys(gullyFlowRateCollisions).length === 0) {
                gullyFlowRateCollisions['collisionChannelMaterial'] = { value: true };
              }

              materialCollisions['collisionGullyFlowRate'] = { value: true };
            }
          }
        }

        if (gullyFlange.value) {
          filteredGullies = filteredGullies.filter((x) => x.flange === gullyFlange.value);

          if (outletDiameter.value) {
            filteredGullies = filteredGullies.filter((x) => x.diameter === outletDiameter.value);

            if (filteredGullies.length === 0) {
              gullyFlangeCollisions['collisionOutletDiameter'] = { value: true };
              outletDiameterCollisions['collisionGullyFlange'] = { value: true };
            }
          }

          if (gullyDiameter.value && filteredGullies.length !== 0) {
            filteredGullies = filteredGullies.filter((x) => x.dsmall === gullyDiameter.value);
            if (filteredGullies.length === 0) {
              if (Object.keys(gullyFlangeCollisions).length === 0) {
                gullyFlangeCollisions['collisionGullyDiameter'] = { value: true };
              }

              gullyDiameterCollisions['collisionGullyFlange'] = { value: true };
            }
          }

          if (outletDirection.value && filteredGullies.length !== 0) {
            filteredGullies = filteredGullies.filter((x) => x.direction === outletDirection.value);
            if (filteredGullies.length === 0) {
              if (Object.keys(gullyFlangeCollisions).length === 0) {
                gullyFlangeCollisions['collisionOutletDirection'] = { value: true };
              }

              gullyOutletDirectionCollisions['collisionGullyFlange'] = { value: true };
            }
          }

          if (material.value && filteredGullies.length !== 0) {
            filteredGullies = filteredGullies.filter((x) => x.materialEN === material.value);
            if (filteredGullies.length === 0) {
              if (Object.keys(gullyFlangeCollisions).length === 0) {
                gullyFlangeCollisions['collisionChannelMaterial'] = { value: true };
              }

              materialCollisions['collisionGullyFlange'] = { value: true };
            }
          }
        }
      }
    }

    /// CHANNEL LENGTH x TRANSPORT CONNECTION COLLISION ///
    if (channelLength.value <= 2000 && transportConnection.value !== null) {
      transportConnectionCollisions['collisionLength'] = { value: true };
    } else if (channelLength.value > 6000 && transportConnection.value === null) {
      transportConnectionCollisions['collisionLength'] = { value: true };
    }
    if (transportConnection.value >= channelLength.value) {
      transportConnectionCollisions['collisionLength'] = { value: true };
    }

    /// OUTLET COLLISIONS ///
    if (outletLength.value && outletDiameter.value) {
      if (!this.outletCombinations.find((x) => x.f === outletLength.value && x.forDiameter === outletDiameter.value)) {
        outletDiameterCollisions['collisionOutletLength'] = { value: true };
        outletLengthCollisions['collisionOutletDiameter'] = { value: true };
      }
    }

    this.invalid = false;

    if (Object.keys(gratingLoadCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(gratingTypeCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(gratingHeightCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(gratingMaterialCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(gratingSurfaceCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(gratingSurfaceTreatmentCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(meshSizeCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(hasGullyCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(gullyDiameterCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(gullyOutletDirectionCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(gullyFlangeCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(gullyFlowRateCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(outletDiameterCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(outletLengthCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(materialCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(lengthLevellingFeetCollisions).length !== 0) {
      this.invalid = true;
    }

    if (Object.keys(transportConnectionCollisions).length !== 0) {
      this.invalid = true;
    }

    if (hasGrate.value === true) {
      if (!gratingType.value) {
        gratingTypeCollisions['required'] = { value: true };
      }

      if (!gratingMaterial.value) {
        gratingMaterialCollisions['required'] = { value: true };
      }

      if (gratingType.value !== 'heelsafe' && !gratingSurface.value) {
        gratingSurfaceCollisions['required'] = { value: true };
      }

      if (!gratingSurfaceTreatment.value) {
        gratingSurfaceTreatmentCollisions['required'] = { value: true };
      }

      if (gratingType.value === 'mesh' && !meshSize.value) {
        meshSizeCollisions['required'] = { value: true };
      }
    }

    if (hasGully.value === true) {
      if (!gullyFlange.value) {
        gullyFlangeCollisions['required'] = { value: true };
      }

      if (!outletDirection.value) {
        gullyOutletDirectionCollisions['required'] = { value: true };
      }

      if (!gullyDiameter.value) {
        gullyDiameterCollisions['required'] = { value: true };
      }

      if (!gullyFlowRate.value) {
        gullyFlowRateCollisions['required'] = { value: true };
      }
    }

    if (!outletDiameter.value) {
      outletDiameterCollisions['required'] = { value: true };
    }

    if (!outletLength.value) {
      outletLengthCollisions['required'] = { value: true };
    }

    if (!material.value) {
      materialCollisions['required'] = { value: true };
    }

    if (Object.keys(gratingHeightCollisions).length !== 0) {
      gratingHeight.setErrors(gratingHeightCollisions);
    } else {
      gratingHeight.setErrors(null);
    }

    if (Object.keys(gratingLoadCollisions).length !== 0) {
      gratingLoad.setErrors(gratingLoadCollisions);
    } else {
      gratingLoad.setErrors(null);
    }

    if (Object.keys(gratingTypeCollisions).length !== 0) {
      gratingType.setErrors(gratingTypeCollisions);
    } else {
      gratingType.setErrors(null);
    }

    if (Object.keys(gratingMaterialCollisions).length !== 0) {
      gratingMaterial.setErrors(gratingMaterialCollisions);
    } else {
      gratingMaterial.setErrors(null);
    }

    if (Object.keys(gratingSurfaceCollisions).length !== 0) {
      gratingSurface.setErrors(gratingSurfaceCollisions);
    } else {
      gratingSurface.setErrors(null);
    }

    if (Object.keys(gratingSurfaceTreatmentCollisions).length !== 0) {
      gratingSurfaceTreatment.setErrors(gratingSurfaceTreatmentCollisions);
    } else {
      gratingSurfaceTreatment.setErrors(null);
    }

    if (Object.keys(meshSizeCollisions).length !== 0) {
      meshSize.setErrors(meshSizeCollisions);
    } else {
      meshSize.setErrors(null);
    }

    if (Object.keys(hasGullyCollisions).length !== 0) {
      hasGully.setErrors(hasGullyCollisions);
    } else {
      hasGully.setErrors(null);
    }

    if (Object.keys(gullyDiameterCollisions).length !== 0) {
      gullyDiameter.setErrors(gullyDiameterCollisions);
    } else {
      gullyDiameter.setErrors(null);
    }

    if (Object.keys(gullyOutletDirectionCollisions).length !== 0) {
      outletDirection.setErrors(gullyOutletDirectionCollisions);
    } else {
      outletDirection.setErrors(null);
    }

    if (Object.keys(gullyFlangeCollisions).length !== 0) {
      gullyFlange.setErrors(gullyFlangeCollisions);
    } else {
      gullyFlange.setErrors(null);
    }

    if (Object.keys(gullyFlowRateCollisions).length !== 0) {
      gullyFlowRate.setErrors(gullyFlowRateCollisions);
    } else {
      gullyFlowRate.setErrors(null);
    }

    if (Object.keys(outletDiameterCollisions).length !== 0) {
      outletDiameter.setErrors(outletDiameterCollisions);
    } else {
      outletDiameter.setErrors(null);
    }

    if (Object.keys(outletLengthCollisions).length !== 0) {
      outletLength.setErrors(outletLengthCollisions);
    } else {
      outletLength.setErrors(null);
    }

    if (Object.keys(materialCollisions).length !== 0) {
      material.setErrors(materialCollisions);
    } else {
      material.setErrors(null);
    }

    if (Object.keys(lengthLevellingFeetCollisions).length !== 0) {
      lengthLevellingFeet.setErrors(lengthLevellingFeetCollisions);
    } else {
      lengthLevellingFeet.setErrors(null);
    }

    if (Object.keys(transportConnectionCollisions).length !== 0) {
      transportConnection.setErrors(transportConnectionCollisions);
    } else {
      transportConnection.setErrors(null);
    }

    if (this.invalid && !this.collisionSolverOpened) {
      this.showCollisionSolver();
    }

    return control.errors;
  };
};
