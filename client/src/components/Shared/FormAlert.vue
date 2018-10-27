<template>
 <el-alert
    :title="message"
    type="error">
  </el-alert>
</template>

<script>
export default {
  props: ['message']
}
</script>

