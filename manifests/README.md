# Deployment manifests

Use `oc` or `kubectl` and `kustomize` to apply and delete these manifests.

```
# apply
kustomize build . | oc apply -f -
# delete
kustomize build . | oc delete -f -
```

