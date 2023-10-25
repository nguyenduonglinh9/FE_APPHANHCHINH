if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/ACER/.gradle/caches/transforms-3/c0e78a13b4d2d54ad4fd4d4bae3cdfc9/transformed/jetified-hermes-android-0.72.5-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/ACER/.gradle/caches/transforms-3/c0e78a13b4d2d54ad4fd4d4bae3cdfc9/transformed/jetified-hermes-android-0.72.5-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

